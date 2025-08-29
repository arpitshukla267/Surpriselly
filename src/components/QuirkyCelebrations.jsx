import React from "react";

const quirkyItems = [
  {
    title: "Birthday Gifts",
    image: "https://i.pinimg.com/736x/e9/1c/e2/e91ce236c6d19a18b996356ded25dc2e.jpg", 
    bg: "transparent",
  },
  {
    title: "For Friends",
    image: "https://i.pinimg.com/736x/32/b2/b5/32b2b5b01130cb7ef5889e757f73d5f7.jpg",
    bg: "transparent",
  },
  {
    title: "Pop Culture",
    image: "https://i.pinimg.com/1200x/dd/39/eb/dd39eba8a9f327da683ace54875e09f8.jpg",
    bg: "transparent",
  },
  {
    title: "Hatke Gifts",
    image: "https://i.pinimg.com/736x/40/c7/58/40c758a0af210d440428ca41f6b72687.jpg",
    bg: "transparent",
  },
];

export default function QuirkyCelebrations() {
  return (
    <section className="px-0 md:px-8 bg-purple-50 py-10 max-w-7xl mx-auto">
      <h2 className="text-xl ml-8 sm:text-2xl font-bold mb-6">
        Genz Special
      </h2>

      <div className="flex flex-wrap justify-center md:grid md:grid-cols-5 gap-0 md:gap-6">
        {quirkyItems.map((item, i) => (
          <div
            key={i}
            className={`
              ${item.bg}
              lg:rounded-2xl w-[45vw] md:w-auto overflow-hidden transition-transform hover:scale-105
              flex flex-col items-center justify-between
              ${i === quirkyItems.length - 1 ? "md:col-span-2" : ""}
            `}
          >
            <div className="px-2 w-full flex justify-center items-center">
              <img
                src={item.image}
                alt={item.title}
                className="w-full sm:w-28 md:w-full h-40 sm:h-44 md:h-48 object-fit"
              />
            </div>
            <div className="text-center py-4 text-sm font-medium">
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
