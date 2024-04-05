import Image from "next/image";
import React from "react";
import Link from "next/link";

const RightSideBar = () => {
  return (
    <div className="sticky right-0 top-0 z-20 h-screen w-[300px] xl:w-[380px] flex flex-col gap-12 overflow-auto pl-6 pr-6 py-6 max-[1193px]:hidden">
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-light-1 text-heading3-bold float-left">
            Kotak Neo
          </h3>
          <p className="mt-2">
            <sub>@Sponsered</sub>{" "}
          </p>
        </div>
        <Link
          href={"https://KotakSecurities.ref-r.com/c/i/32531/101037703"}
          target="_blank">
          <Image
            src="/images/ad.png"
            alt="ad"
            width={280}
            height={200}
            className="rounded-lg"
          />
        </Link>
        <Link href={"https://KotakSecurities.ref-r.com/c/i/32531/101037703"}
          target="_blank" className="text-body-bold text-light-1">Trade with Brokerage Free</Link>
        <Link href={"https://KotakSecurities.ref-r.com/c/i/32531/101037703"}
          target="_blank" className="text-small-semibold text-light-2 text-justify">
          <span className="text-small-bold text-light-1">
            Open Your Demate Account.
          </span>
          Kotak Neo is an effortless and robust trading platform designed for
          the modern-day traders and investors. With Kotak Neo, you can trade in
          Equity, F&O, Currency, and Commodity. You can also invest in Mutual
          Funds and apply for IPOs. Our expert research team provides you with
          investment ideas and trading calls to help you with your stock
          choices. Plus, to keep you apprised about the latest happenings in the
          market, we curate news from the best and most credible sources.
        </Link>
      </div>
    </div>
  );
};

export default RightSideBar;
