"use client";
import {
  IconArrowRight,
  IconShoppingCart,
  IconArrowUp as TbArrowUp,
} from "@tabler/icons-react";
import { useWindowScroll } from "@mantine/hooks";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ScrollToTopButton() {
  const [scroll, scrollTo] = useWindowScroll();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (scroll.y > 550) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    return () => {};
  }, [scroll]);

  return isVisible ? (
    <>
      <div className="fixed bottom-5 right-5 z-50">
        <button
          className="bg-orange-500 border border-black self-center px-[18px] py-[9px] hover:bg-orange-600 rounded"
          onClick={() => scrollTo({ y: 0 })}
        >
          <TbArrowUp size="1rem" color="white" />
        </button>
      </div>
      <div className="fixed bottom-5 left-5 z-50"></div>
    </>
  ) : null;
}
