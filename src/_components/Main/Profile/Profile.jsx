import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MyContext } from "../../../../context-Api/ContextAPI";
import AnimateOnClose from "../../../../framer-motion/AnimateOnClose";
import { useContext } from "react";
import AnimateOnRender from "../../../../framer-motion/AnimateOnRender";

export default function Profile() {
  const { closeAnimation } = useContext(MyContext);

  return (
    <>
      <AnimateOnRender />
      <section className="bg-black min-h-[100vh] text-white pt-[65px] w-full">
        <section className=" px-5 w-full md:px-[90px] lg:px-[200px] xl:px-[250px]">
          <h1
            style={{ fontFamily: "Montserrat" }}
            className="text-[25px] text-center font-semibold sm:text-[30px] md:text-[36px] lg:text-[42px] xl:text-[48px] mb-10"
          >
            Sehrish Hussain
          </h1>
          <p className="text-[18px] leading-7 font-light mb-6 md:text-[17px] lg:text-[20px] lg:font-normal lg:leading-9">
            Sehrish Hussain is a Pakistani-American who’s family grew up in
            Metro-Detroit, where she currently works. Her practice investigates
            notions of tradition, family narratives, and cultural hybridity. She
            works primarily in relief prints on paper and fabric and her
            proclivity towards pattern, color, and post-painterly abstraction
            has become the driving force behind her practice. She is currently
            pursuing an MFA in Print Media at Cranbrook Academy of Art and based
            in Metro Detroit, dedicated to creating works that serve as both a
            personal and cultural archive.
          </p>
          <Accordion type="multiple" collapsible>
            <AccordionItem value="item-1" className="mt-10">
              <AccordionTrigger
                style={{ fontFamily: "Montserrat" }}
                className="text-[18px] font-semibold"
              >
                Selected Solo/Group Exhibitions
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-10 py-10">
                <section className="flex flex-col gap-1">
                  <h1 className="text-[22px] mb-5">Group Shows</h1>
                  <div className="flex items-center  gap-1">
                    <h1
                      style={{ fontFamily: "Montserrat" }}
                      className="text-[17px] font-semibold text-nowrap"
                    >
                      2024 Upcoming :
                    </h1>
                    <p className="tracking-wider text-lg leading-7 px-2">
                      Café Liv, Ann Arbor, MI
                    </p>
                  </div>
                  <div className="flex items-start">
                    <h1
                      style={{ fontFamily: "Montserrat" }}
                      className="text-[17px] font-semibold text-nowrap pt-1"
                    >
                      2024 :
                    </h1>
                    <p className="tracking-wider text-lg leading-7 px-2">
                      On Seeing Red, Forum Gallery, Bloomfield Hills, MI|
                    </p>
                  </div>
                  <div className="flex items-start">
                    <h1
                      style={{ fontFamily: "Montserrat" }}
                      className="text-[17px] font-semibold text-nowrap pt-1"
                    >
                      2024 :
                    </h1>
                    <p className="tracking-wider text-lg leading-7 px-2">
                      Space Between, Forum Gallery, Bloomfield Hills, MI{" "}
                    </p>
                  </div>
                  <div className="flex items-start">
                    <h1
                      style={{ fontFamily: "Montserrat" }}
                      className="text-[17px] font-semibold text-nowrap pt-1"
                    >
                      2024 :
                    </h1>
                    <p className="tracking-wider text-lg leading-7 px-2">
                      Ramadan Bazaar, Muslim Community Association{" "}
                    </p>
                  </div>
                  <div className="flex items-start">
                    <h1
                      style={{ fontFamily: "Montserrat" }}
                      className="text-[17px] font-semibold text-nowrap pt-1"
                    >
                      2024 :
                    </h1>
                    <p className="tracking-wider text-lg leading-7 px-2">
                      Anexxx, Annex Gallery, Bloomfield Hills{" "}
                    </p>
                  </div>
                  <div className="flex items-start">
                    <h1
                      style={{ fontFamily: "Montserrat" }}
                      className="text-[17px] font-semibold text-nowrap pt-1"
                    >
                      2023 :
                    </h1>
                    <p className="tracking-wider text-lg leading-7 px-2">
                      DABF, Trinosophes, Detroit, MI{" "}
                    </p>
                  </div>
                  <div className="flex items-start">
                    <h1
                      style={{ fontFamily: "Montserrat" }}
                      className="text-[17px] font-semibold text-nowrap pt-1"
                    >
                      2023 :
                    </h1>
                    <p className="tracking-wider text-lg leading-7 px-2">
                      Nook, Forum Gallery, Bloomfield Hills, MI
                    </p>
                  </div>
                  <div className="flex items-start">
                    <h1
                      style={{ fontFamily: "Montserrat" }}
                      className="text-[17px] font-semibold text-nowrap pt-1"
                    >
                      2023 :
                    </h1>
                    <p className="tracking-wider text-lg leading-7 px-2">
                      Figment Fragment, BFA Senior Thesis Show, Ann Arbor, MI
                    </p>
                  </div>
                </section>
                <section className="flex flex-col gap-1">
                  <h1 className="text-[22px] mb-5">Grants</h1>
                  <div className="flex items-start">
                    <h1
                      style={{ fontFamily: "Montserrat" }}
                      className="text-[17px] flex flex-col items-center justify-center font-semibold  pt-1"
                    >
                      <span className="flex flex-col md:flex-row items-center gap-0">
                        <p>2023</p>
                        <p>-</p>
                        <p>2025</p>
                      </span>
                    </h1>
                    <p className="tracking-wider text-lg leading-7 px-2">
                      : Gilbert Fellowship, Fully-funded MFA Program at
                      Cranbrook Academy of Art
                    </p>
                  </div>
                  <div className="flex items-start">
                    <h1
                      style={{ fontFamily: "Montserrat" }}
                      className="text-[17px] font-semibold text-nowrap pt-1"
                    >
                      2022 :
                    </h1>
                    <p className="tracking-wider text-lg leading-7 px-2">
                      Business + Impact Grant, $6,000
                    </p>
                  </div>
                  <div className="flex items-start">
                    <h1
                      style={{ fontFamily: "Montserrat" }}
                      className="text-[17px] font-semibold text-nowrap pt-1"
                    >
                      2022 :
                    </h1>
                    <p className="tracking-wider text-lg leading-7 px-2">
                      Stamps Internship Grant, $1,500
                    </p>
                  </div>
                  <div className="flex items-start">
                    <h1
                      style={{ fontFamily: "Montserrat" }}
                      className="text-[17px] font-semibold text-nowrap pt-1"
                    >
                      2022 :
                    </h1>
                    <p className="tracking-wider text-lg leading-7 px-2">
                      The Arts at Michigan Student Mini Grant, $500
                    </p>
                  </div>
                  <div className="flex items-start">
                    <h1
                      style={{ fontFamily: "Montserrat" }}
                      className="text-[17px] font-semibold text-nowrap pt-1"
                    >
                      2021 :
                    </h1>
                    <p className="tracking-wider text-lg leading-7 px-2">
                      Business + Impact Grant, $2,000
                    </p>
                  </div>
                  <div className="flex items-start">
                    <h1
                      style={{ fontFamily: "Montserrat" }}
                      className="text-[17px] font-semibold text-nowrap pt-1"
                    >
                      2021 :
                    </h1>
                    <p className="tracking-wider text-lg leading-7 px-2">
                      Undergraduate Student Research Grant, $2000
                    </p>
                  </div>
                </section>
                <section className="flex flex-col gap-3">
                  <h1 className="text-[22px] mb-5">Workshops</h1>
                  <div className="flex items-start">
                    <h1
                      style={{ fontFamily: "Montserrat" }}
                      className="text-[17px] font-semibold text-nowrap pt-1"
                    >
                      2024 :
                    </h1>
                    <p className="tracking-wider text-lg leading-7 px-2">
                      Laser-cut woodcut prints: Blending historical craft with
                      new technologies Teaching
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <h1
                      style={{ fontFamily: "Montserrat" }}
                      className="text-[17px] font-semibold pt-1"
                    >
                      <span className="flex flex-col md:flex-row items-center gap-0">
                        <p>2022</p>
                        <p>-</p>
                        <p>2023</p>
                      </span>
                    </h1>
                    <p className="tracking-wider text-lg leading-7">
                      : Public Tour Lead, University of Michigan Museum of Art,
                      Ann Arbor, MI
                    </p>
                  </div>
                  <div className="flex items-start">
                    <h1
                      style={{ fontFamily: "Montserrat" }}
                      className="text-[17px] font-semibold text-nowrap pt-1"
                    >
                      2022 :
                    </h1>
                    <p className="tracking-wider text-lg leading-7 px-2">
                      Art Camp Instructor, Studio Gallery DC, Washington, DC
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <h1
                      style={{ fontFamily: "Montserrat" }}
                      className="text-[17px] font-semibold text-nowrap pt-1"
                    >
                      2021 :
                    </h1>
                    <p className="tracking-wider text-lg leading-7">
                      Art Camp Instructor, Charles H. Wright Museum of African
                      American History and Culture, Detroit, MI
                    </p>
                  </div>
                  <div className="flex items-start">
                    <h1
                      style={{ fontFamily: "Montserrat" }}
                      className="text-[17px] font-semibold pt-1 text-nowrap"
                    >
                      2020 :
                    </h1>
                    <p className="tracking-wider text-lg leading-7 px-2">
                      Diversity Peer Educator, University of Michigan, Ann
                      Arbor, MI
                    </p>
                  </div>
                  <div className="flex items-start">
                    <h1
                      style={{ fontFamily: "Montserrat" }}
                      className="text-[17px] font-semibold pt-1 text-nowrap"
                    >
                      2019 :
                    </h1>
                    <p className="tracking-wider text-lg leading-7 px-2">
                      Facilitator, Umich Central Student Government, Ann Arbor,
                      MI
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <h1
                      style={{ fontFamily: "Montserrat" }}
                      className="text-[17px] font-semibold text-nowrap pt-1"
                    >
                      2019 :
                    </h1>
                    <p className="tracking-wider text-lg leading-7">
                      Part-time teacher, Islamic Association of Greater Detroit,
                      Rochester Hills, MI
                    </p>
                  </div>
                </section>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </section>
      {closeAnimation && <AnimateOnClose />}
    </>
  );
}
