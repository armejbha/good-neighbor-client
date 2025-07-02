import React, { useState } from "react";

const images = [
  { id: 1, src: "https://source.unsplash.com/800x600/?volunteer", span: 3 },
  { id: 2, src: "https://source.unsplash.com/600x600/?charity", span: 2 },
  { id: 3, src: "https://source.unsplash.com/400x600/?community", span: 1 },
  { id: 4, src: "https://source.unsplash.com/600x400/?children", span: 2 },
  { id: 5, src: "https://source.unsplash.com/400x400/?help", span: 1 },
  { id: 6, src: "https://source.unsplash.com/800x600/?volunteering", span: 3 },
  { id: 7, src: "https://source.unsplash.com/400x500/?care", span: 2 },
  { id: 8, src: "https://source.unsplash.com/600x400/?event", span: 1 },
];

const GallerySection = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <section className="py-16 px-4 lg:px-20 bg-base-100 text-base-content">
      <h2 className="text-3xl font-bold text-center mb-10">Gallery</h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {images.map((img) => (
          <div
            key={img.id}
            className={`col-span-${img.span} overflow-hidden rounded-xl shadow-lg cursor-pointer group transition-all duration-300`}
            onClick={() => setSelectedImg(img.src)}
          >
            <img
              src={img.src}
              alt=""
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImg && (
        <dialog id="imgModal" className="modal modal-open">
          <form method="dialog" className="modal-box max-w-4xl bg-base-200">
            <img
              src={selectedImg}
              alt="Expanded"
              className="w-full rounded-lg"
            />
            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedImg(null)}>
                Close
              </button>
            </div>
          </form>
        </dialog>
      )}
    </section>
  );
};

export default GallerySection;
