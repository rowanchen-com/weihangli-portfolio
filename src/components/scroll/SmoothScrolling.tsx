"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { frame, cancelFrame } from "motion"; // 或者 "motion"，取决于你的安装
import { ReactNode, useEffect, useRef } from "react";

function SmoothScrolling({ children }: { children: ReactNode }) {
    // 1. 使用更好的类型定义
    const lenisRef = useRef<LenisRef>(null);

    useEffect(() => {
        function update(data: { timestamp: number }) {
            lenisRef.current?.lenis?.raf(data.timestamp);
        }

        // 使用 frame.read 而非 frame.update，确保 Lenis 在 Motion 读取滚动值之前完成更新
        frame.read(update, true);

        return () => {
            cancelFrame(update);
        };
    }, []);

    return (
        <ReactLenis
            root
            ref={lenisRef}
            options={{
                lerp: 0.1,
                duration: 1.2,
                smoothWheel: true,
                autoRaf: false,
            }}
        >
            {children}
        </ReactLenis>
    );
}

export default SmoothScrolling;