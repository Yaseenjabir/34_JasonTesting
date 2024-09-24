export default function NotFoundPage() {
  return (
    <>
      <div className="w-full mt-[65px] flex flex-col items-center justify-center">
        <div className="text-center mt-28 md:mb-28">
          <h1
            className="text-4xl font-semibold"
            style={{ fontFamily: "Montserrat" }}
          >
            Error 404
          </h1>
          <p className="mt-10">Page not found</p>
        </div>
      </div>
    </>
  );
}
