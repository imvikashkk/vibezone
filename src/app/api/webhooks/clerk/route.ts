import { clerkClient } from "@clerk/nextjs";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { createUser, updateUser } from "@/lib/action/user";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  // CREATE User in mongodb
  if (eventType === "user.created") {
    const {
      id,
      email_addresses,
      image_url,
      first_name,
      last_name,
      username,
      created_at,
    } = evt?.data;

    let firstname = first_name;
    let lastname = last_name;

    if (lastname === null) {
      if (firstname !== null) {
        const name = firstname.split(" ");
        firstname = name[0];
        lastname = name.slice(1).join(" ");
      }
    }

    const user: any = {
      clerkId: id,
      firstName: firstname,
      lastName: lastname ? lastname : "" ,
      username: username!,
      email: email_addresses[0]?.email_address,
      profilePhoto: image_url,
      createdUserAt: new Date(created_at),
    };

    const newUser: any = await createUser(user);
    if (newUser) {
      await clerkClient.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: newUser._id,
        },
      });
    }

    return NextResponse.json(
      { message: "New user created", user: newUser },
      { status: 201 }
    );
  }

  // Update User in mongodb
  if (eventType === "user.updated") {
    const {
      id,
      email_addresses,
      image_url,
      first_name,
      last_name,
      username,
      created_at,
      updated_at,
      public_metadata,
    } = evt?.data;

    let firstname = first_name;
    let lastname = last_name;

    if (lastname === null) {
      if (firstname !== null) {
        const name = firstname.split(" ");
        firstname = name[0];
        lastname = name.slice(1).join(" ");
      }
    }

    const user: any = {
      clerkId: id,
      userId: public_metadata.userId,
      firstName: firstname,
      lastName: lastname ? lastname : "",
      username: username!,
      email: email_addresses[0].email_address,
      profilePhoto: image_url,
      createdUserAt: new Date(created_at),
      updatedUserAt: new Date(updated_at),
    };

    const updatedUser:any = await updateUser(user);

    return NextResponse.json(
      { message: "User updated successfully", user:updatedUser },
      { status: 200}
    );
    
  }

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);
  return new Response("", { status: 200 });
}
