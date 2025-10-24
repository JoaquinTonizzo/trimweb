import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const CustomCursor: React.FC = () => {
  const isMobile = useIsMobile();
  const dotRef = React.useRef<HTMLDivElement | null>(null);
  const raf = React.useRef<number | null>(null);
  const mouse = React.useRef({ x: -9999, y: -9999 });
  const pos = React.useRef({ x: -9999, y: -9999 });
  const hiddenRef = React.useRef(false);

  React.useEffect(() => {
    if (isMobile) return;

  // Only consider visual controls (links/buttons). Inputs/selects keep native cursor for accessibility.
  const interactiveSelector = "button, a, [role=button]";

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      const el = document.elementFromPoint(e.clientX, e.clientY) as Element | null;
      const overInteractive = !!(el && el.closest && el.closest(interactiveSelector));

      if (overInteractive) {
        // add minimal active style and ensure visible
        if (dotRef.current) {
          dotRef.current.classList.add("cursor-dot--active");
          dotRef.current.style.opacity = "1";
        }
      } else {
        if (dotRef.current) {
          dotRef.current.classList.remove("cursor-dot--active");
          dotRef.current.style.opacity = "1";
        }
      }
    };

    const onLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
      if (dotRef.current) dotRef.current.style.opacity = "0";
    };

    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.28;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.28;

      if (dotRef.current) {
        const size = 12;
        dotRef.current.style.width = `${size}px`;
        dotRef.current.style.height = `${size}px`;
        dotRef.current.style.transform = `translate3d(${pos.current.x - size / 2}px, ${pos.current.y - size / 2}px, 0)`;
      }

      raf.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div aria-hidden className="custom-cursor fixed inset-0 pointer-events-none z-[9999]">
      <div ref={(el) => (dotRef.current = el)} className={`cursor-dot`} />
    </div>
  );
};

export default CustomCursor;
