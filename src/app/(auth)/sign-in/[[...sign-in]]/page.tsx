import { SignIn } from "@clerk/nextjs";
import "../../style.css" 

export default function Page() {
  return <div className="flex justify-center "><SignIn /></div>;
}