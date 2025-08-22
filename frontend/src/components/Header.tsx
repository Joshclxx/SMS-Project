export default function Header() {
  return (
    <div className="flex items-center justify-center bg-secondary/90 gap-2">
      <img
        src="/icons/iihc-logo.svg"
        alt="IIH College Icon"
        width="120px"
        height="120px"
      />
      <div className="flex flex-col items-center text-white">
        <p className="body font-bold text-center">
          Integrated Innovation and Hospitality Colleges, Inc.
          <br />
        </p>
        <p className="caption text-center">
          Dela Rama Bldg. Bueanamar Drive, Novaliches,
          <br />
          Quezon City, Philippines
        </p>
      </div>
      <img
        src="/icons/ched-logo.svg"
        alt="IIH College Icon"
        width="92px"
        height="92px"
      />
    </div>
  );
}
