"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import PopupComponent from "@/components/Popup";

export default function Dashboard() {
  const [selectedDebts, setSelectedDebts] = useState<string[]>([]);
  const [paidDebts, setPaidDebts] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("კომუნალური გადახდა");
  const [ecoMessage, setEcoMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const paymentTimeoutRef = useRef<number | null>(null);

  const ecoMessages = [
    "დაიცავით ბუნება – მცირე ქმედებაც ქმნის დიდ ცვლილებებს.",
    "დაზოგეთ ენერგია და შეამცირეთ დაბინძურება, მიიღეთ ეკო გადაწყვეტილებები.",
    "მცირე ნაბიჯები, როგორიცაა LED განათების გამოყენება, მნიშვნელოვან გავლენას ახდენს ეკოლოგიაზე.",
    "გახდით ეკო მეგობრული: გამოიყენეთ სუფთა და განახლებადი ენერგია.",
    "გახსოვდეთ, რომ ბუნების დაცვა ჩვენი - ყველას მოვალეობაა.",
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDebtSelection = (id: string) => {
    if (paidDebts.includes(id)) return;
    setSelectedDebts((prev) =>
      prev.includes(id) ? prev.filter((debtId) => debtId !== id) : [...prev, id]
    );
  };

  const handlePaymentClick = () => {
    if (isProcessing) return;
    setIsProcessing(true);

    paymentTimeoutRef.current = window.setTimeout(() => {
      setPaidDebts((prev) => [...prev, ...selectedDebts]);
      setSelectedDebts([]);
      const randomMessage =
        ecoMessages[Math.floor(Math.random() * ecoMessages.length)];
      setEcoMessage(randomMessage);
      setIsProcessing(false);
    }, 2000);
  };

  const debts = [
    {
      mine: true,
      id: "4910520840",
      name: "ეპ ჯორჯია მიწოდება",
      amount: "12.00",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvde9ploF_S2OOGQZN6NL5C7X7Tz0HinzgZA&s",
    },
    {
      mine: true,
      id: "003102991-838",
      name: "სოკარის ბუნებრივი აირი",
      amount: "-167.00",
      image: "https://formulanews.ge/uploads_script3/news/pow2gmfal8dj1yv.jpg",
    },
    {
      mine: true,
      id: "341821936",
      name: "მაგთის ოპტიკური ინტერნეტი",
      amount: "-26.18",
      image: "https://uploads.allpayway.ge/files/services/5f6b115e1e6e8.png",
    },
  ];

  const totalDebt = selectedDebts.reduce((acc, debtId) => {
    const d = debts.find((deb) => deb.id === debtId);
    if (!d) return acc;
    const numericValue = parseFloat(d.amount);
    return numericValue < 0 ? acc + numericValue : acc;
  }, 0);

  const totalDebtFix = debts
    .filter(
      (debt) => parseFloat(debt.amount) < 0 && !paidDebts.includes(debt.id)
    )
    .reduce((acc, debt) => acc + parseFloat(debt.amount), 0);

  return (
    <div className="flex flex-col mt-32 h-screen">
      <div className="flex pl-20 border-b">
        {[
          "მომხმარებლის სივრცე",
          "კომუნალური გადახდა",
          "პარკინგი და ჯარიმები",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-base font-normal relative ${
              activeTab === tab
                ? "text-[#00a3e0]"
                : "text-gray-700 hover:text-[#00a4e0e9]"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute left-0 bottom-0 w-full h-1 bg-[#00a3e0]" />
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-grow bg-[#f7f8f9] px-20 pt-8">
        <main className="flex-1 border-l shadow-md rounded-tl-xl">
          <div
            className={`w-full py-4 px-6 rounded-tl-xl ${
              selectedDebts.length > 0
                ? "bg-[#f7f8f9] text-black"
                : "bg-[#19569b] text-white"
            }`}
          >
            1. აირჩიე გადასახდელები, რომლის დაფარვაც გსურს
          </div>

          <div className="pb-4 mb-4 mt-4 flex justify-between items-center">
            <input
              type="search"
              autoComplete="off"
              minLength={3}
              placeholder="ძებნა"
              className="w-1/2 px-4 py-2 border ml-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="flex">
              <button className="text-[#00a3e0] hover:text-[#00a4e0b3] text-sm font-semibold px-4 py-2 rounded">
                გადახდების დაჯგუფება
              </button>
              <button className="text-[#00a3e0] hover:text-[#00a4e0b3] text-sm font-semibold px-4 py-2 rounded">
                ახალი გადახდა +
              </button>
            </div>
          </div>

          <div className="pb-4 mb-4 mt-4 flex justify-between items-center">
            <button className="text-black font-semibold px-4 py-2 rounded">
              ჩემი გადახდები
            </button>
            <button className="text-black font-light px-4 py-2 rounded">
              ჯამური დავალიანება:{" "}
              <span
                className={`font-semibold ${
                  totalDebtFix < 0 ? "text-[#b12f26]" : "text-[#8dc63f]"
                }`}
              >
                {totalDebtFix.toFixed(2)} GEL
              </span>
            </button>
          </div>

          <div className="space-y-2">
            {debts
              .filter((debt) => !paidDebts.includes(debt.id))
              .map((debt) => {
                const numericValue = parseFloat(debt.amount);
                const isPaid = paidDebts.includes(debt.id);
                return (
                  <div
                    key={debt.id}
                    className={`p-4 border-t rounded flex justify-between items-center relative ${
                      selectedDebts.includes(debt.id)
                        ? "bg-blue-100 border-blue-500"
                        : ""
                    }`}
                  >
                    <div className="flex items-center space-x-2 p-2 border rounded-full">
                      <div className="w-14 h-14 flex items-center justify-center overflow-hidden rounded-full bg-white">
                        <Image
                          src={debt.image}
                          alt={debt.name}
                          width={60}
                          height={60}
                          className="object-cover rounded-full"
                        />
                      </div>
                    </div>

                    <span>{debt.name}</span>
                    {numericValue < 0 ? (
                      <span className="font-semibold text-[#b12f26]">
                        {debt.amount} GEL
                      </span>
                    ) : (
                      <span className="font-semibold text-[#8dc63f]">
                        {debt.amount} GEL
                      </span>
                    )}

                    <div className="flex items-center gap-3 space-x-2">
                      <button
                        className={`px-6 py-2 rounded border cursor-pointer ${
                          selectedDebts.includes(debt.id)
                            ? "bg-purple-700 text-white"
                            : isPaid
                            ? "bg-gray-300 text-gray-600 cursor-default"
                            : "bg-white text-purple-700 border-fuchsia-700"
                        }`}
                        onClick={() => toggleDebtSelection(debt.id)}
                        disabled={isPaid}
                      >
                        {isPaid
                          ? "გადახდილი"
                          : selectedDebts.includes(debt.id)
                          ? "მოხსნა"
                          : "არჩევა"}
                      </button>
                      <PopupComponent />
                      <button
                        className="text-gray-500 font-bold text-2xl"
                        onClick={() =>
                          setMenuOpen(menuOpen === debt.id ? null : debt.id)
                        }
                      >
                        ⋮
                      </button>
                      {menuOpen === debt.id && (
                        <div
                          ref={menuRef}
                          className="absolute z-50 right-6 mt-32 w-96 bg-white border shadow-md rounded-md p-2"
                        >
                          <ul className="space-y-2">
                            <li className="p-2 hover:underline cursor-pointer">
                              ჯგუფში დამატება
                            </li>
                            <li className="p-2 hover:underline cursor-pointer">
                              გასანდოება
                            </li>
                            <li className="p-2 hover:underline cursor-pointer">
                              ავტომატურ გადახდაში დამატება
                            </li>
                            <li className="p-2 hover:underline cursor-pointer">
                              წაშლა
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </main>

        <aside className="w-1/3 bg-white border border-gray-200 rounded-xl shadow-md">
          <h2
            className={`w-full py-4 px-6 rounded-tr-xl text-lg font-semibold ${
              selectedDebts.length > 0
                ? "bg-[#19569b] text-white"
                : "bg-[#f7f8f9] text-black"
            }`}
          >
            2. გადახდის კალათა
          </h2>

          {selectedDebts.length > 0 ? (
            <div className="p-4">
              <div className="flex justify-between text-lg font-medium border-b pb-2">
                <span>სულ დავალიანება:</span>
                <span
                  className={`${
                    totalDebt < 0 ? "text-[#b12f26]" : "text-[#8dc63f]"
                  }`}
                >
                  {totalDebt.toFixed(2)} GEL
                </span>
              </div>
              <div className="max-w-md mx-auto bg-green-50 p-6 rounded-lg shadow-md mt-4">
                <p className="text-xl font-bold text-green-900 mb-4">
                  ყოჩაღ! ამ თვეში თქვენი კომუნარული გადასახადი 10%-ით შემცირდა
                  საშუალოსთან შედარებით 👏
                </p>
                <p className="text-lg text-green-800">
                  რესურსების გონივრული ხარჯვით, ერთად ვიზრუნოთ ბუნებაზე 🌱
                </p>
              </div>

              <div className="mt-4 bg-[#f7f8f9] border border-gray-300 rounded-lg p-4 flex items-center space-x-2">
                <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
                  💳
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">თქვენი ანგარიში</p>
                  <p className="text-gray-900 font-medium text-base">
                    GE86T.....9
                  </p>
                  <p className="text-gray-500 text-sm">1500.78 GEL</p>
                </div>
              </div>

              <ul className="mt-4">
                {selectedDebts.map((id) => {
                  const debt = debts.find((d) => d.id === id);
                  if (!debt) return null;
                  return (
                    <li
                      key={id}
                      className="flex justify-between items-center border-b py-2"
                    >
                      <span className="text-gray-800">{debt.name}</span>
                      <span className="text-gray-800">{debt.amount} GEL</span>
                    </li>
                  );
                })}
              </ul>

              {isProcessing ? (
                <button
                  className="mt-6 w-full bg-gray-500 text-white py-4 rounded-lg text-lg font-medium"
                  disabled
                >
                  მიმდინარე გადახდა
                </button>
              ) : (
                <button
                  onClick={handlePaymentClick}
                  className="mt-6 w-full bg-[#8e1ca5] text-white py-4 rounded-lg text-lg font-medium"
                >
                  გადახდა
                </button>
              )}
            </div>
          ) : (
            <div className="p-6 flex flex-col items-center text-center text-gray-600 text-sm">
              <p className="font-medium">გადახდები არ არის არჩეული</p>
              <p className="mt-2 text-gray-500">
                დააჭირე ღილაკს “არჩევა” და გადაიხადე ერთი ან რამდენიმე
                გადასახადი
              </p>
            </div>
          )}

          {paidDebts.length > 0 && (
            <div className="mt-4 p-4 border-t">
              <h3 className="text-lg font-semibold">გადახდილი გადასახადები</h3>
              <ul className="mt-2">
                {paidDebts.map((id) => {
                  const debt = debts.find((d) => d.id === id);
                  if (!debt) return null;
                  return (
                    <li
                      key={id}
                      className="flex justify-between items-center border-b py-2"
                    >
                      <span className="text-gray-800">{debt.name}</span>
                      <span className="text-green-700 font-bold">
                        გადახდილი
                      </span>
                    </li>
                  );
                })}
              </ul>

              {ecoMessage && (
                <div className="relative mt-4 p-4 bg-green-100 border border-green-300 rounded-lg text-green-800 text-lg font-medium">
                  <span>{ecoMessage}</span>
                  <button
                    onClick={() => setEcoMessage(null)}
                    className="absolute top-1 right-1 text-green-800 font-bold"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
