import { FaInstagram } from "react-icons/fa";
import { useLocation } from "react-router";

export default function Footer() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <>
      <footer
        className={`w-full ${
          pathname === "/profile"
            ? "bg-black text-white"
            : "bg-white text-black"
        }  z-10 relative pt-[150px] py-12 mx-auto`}
      >
        <div className="w-full flex flex-col px-12 sm:px6 gap-7 md:hidden">
          <a
            className="w-min"
            href="https://www.instagram.com/sehrishhart?igsh=MWpyOHAzYTQ3c20zOQ=="
          >
            <FaInstagram className="text-[30px] cursor-pointer" />
          </a>
          <div>
            <h1
              className="tracking-[3px] font-semibold "
              style={{ fontFamily: "sans-serif" }}
            >
              Contact
            </h1>
            <p>سحرش حسین</p>
            <p className="text-sm" style={{ fontFamily: "sans-serif" }}>
              sehrishhussainstudio@gmail.com
            </p>
          </div>
          <p className="text-sm" style={{ fontFamily: "sans-serif" }}>
            2024 Sehrish Hussain Portfolio. All rights reserved.{" "}
          </p>
        </div>
        <div className="hidden md:flex items-center justify-center md:gap-7 lg:gap-16 xl:gap-32">
          <div>
            <a
              className="w-min"
              href="https://www.instagram.com/sehrishhart?igsh=MWpyOHAzYTQ3c20zOQ=="
            >
              <FaInstagram className="text-[30px] cursor-pointer" />
            </a>
            <p className="text-sm" style={{ fontFamily: "sans-serif" }}>
              2024 Sehrish Hussain Portfolio. All rights reserved.
            </p>
          </div>
          <div className="pt-1">
            <h1
              className="tracking-[3px] font-semibold "
              style={{ fontFamily: "sans-serif" }}
            >
              Contact
            </h1>
            <p className="text-sm" style={{ fontFamily: "sans-serif" }}>
              سحرش حسین
            </p>
          </div>
          <div>
            <p className="text-sm" style={{ fontFamily: "sans-serif" }}>
              sehrishhussainstudio@gmail.com
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
