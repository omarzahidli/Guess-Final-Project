import { useState } from "react";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

const AccordionItem = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#e5e5e5]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-3 font-semibold"
      >
        <span>{title}</span>
        <span>{isOpen ? <IoChevronUp /> : <IoChevronDown />}</span>
      </button>
      {isOpen && (
        <div className="pb-2 text-sm space-y-1">
          {links.map((link, i) => (
            <a key={i} href="#" className="flex hover:underline">
              {link}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default function AccordionFooter() {
  const sections = [
    {
      title: "Customer Service",
      links: ["Need help?", "My Orders", "Register your return", "Exclusive Services"],
    },
    {
      title: "My account",
      links: ["Account", "Orders", "Privacy policy"],
    },
    {
      title: "Corporate",
      links: ["Careers", "Investor Relations", "Guess Family", "Sustainability"],
    },
    {
      title: "Privacy and Conditions",
      links: ["Privacy and Cookie Policy", "Terms and Conditions", "Manage Cookie Consent"],
    },
  ];

  return (
    <div className="w-full max-w-md mx-auto px-4 md:hidden">
      {sections.map((section, idx) => (
        <AccordionItem key={idx} title={section.title} links={section.links} />
      ))}
    </div>
  );
}
