"use client"
export const Card = ({ title, ImgSource, Description }) => {
    return (
      <div className="card w-1/3 rounded-lg flex flex-col border-black border-2 text-center font-Nue">
        <h1 className="text-3xl font-bold mt-4">{title}</h1>
        <img src={ImgSource} alt={title} className="rounded-t-lg h-250 object-cover" />
        <p className="p-4 text-xl text-center ">{Description}</p>
      </div>
    );
  };
  