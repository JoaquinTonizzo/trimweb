import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const CustomCursor: React.FC = () => {
  const isMobile = useIsMobile();
  const count = 4; // 1 main dot + 3 trail dots
  const dotsRef = React.useRef<HTMLDivElement[]>([]);
  const raf = React.useRef<number | null>(null);
  const mouse = React.useRef({ x: -9999, y: -9999 });
  const positions = React.useRef(
    Array.from({ length: count }).map(() => ({ x: -9999, y: -9999 }))
  );

  React.useEffect(() => {
    if (isMobile) return;

    const interactiveSelector = "button, a, [role=button]";

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      const el = document.elementFromPoint(e.clientX, e.clientY) as Element | null;
      const overInteractive = !!(el && el.closest && el.closest(interactiveSelector));

      if (overInteractive) {
        // add active style to main dot
        const main = dotsRef.current[0];
        if (main) main.classList.add("cursor-dot--active");
      } else {
        const main = dotsRef.current[0];
        if (main) main.classList.remove("cursor-dot--active");
      }
    };

    const onLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
      positions.current.forEach((p) => {
        p.x = -9999;
        p.y = -9999;
      });
      dotsRef.current.forEach((d) => {
        if (d) d.style.opacity = "0";
      });
    };

    const animate = () => {
      // lead dot follows mouse faster
      positions.current[0].x += (mouse.current.x - positions.current[0].x) * 0.35;
      positions.current[0].y += (mouse.current.y - positions.current[0].y) * 0.35;

      for (let i = 1; i < count; i++) {
        // each trail dot follows the previous dot
        positions.current[i].x += (positions.current[i - 1].x - positions.current[i].x) * 0.22;
        positions.current[i].y += (positions.current[i - 1].y - positions.current[i].y) * 0.22;
      }

      // apply styles
      for (let i = 0; i < count; i++) {
        const el = dotsRef.current[i];
        const p = positions.current[i];
        if (!el) continue;
        const size = i === 0 ? 12 : Math.max(4, 10 - i * 2);
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.transform = `translate3d(${p.x - size / 2}px, ${p.y - size / 2}px, 0)`;
        el.style.opacity = p.x < -9000 ? "0" : `${1 - i * 0.25}`;
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
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) dotsRef.current[i] = el;
          }}
          className={i === 0 ? "cursor-dot" : "cursor-trail"}
        />
      ))}
    </div>
  );
};

export default CustomCursor;
