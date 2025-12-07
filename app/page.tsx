"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import  confetti  from "canvas-confetti";

export default function BirthdayLetter() {
  // 手紙が開いているかどうかの状態を管理
  const [isOpen, setIsOpen] = useState(false);
  const [zIndex, setZIndex] = useState(20);
  // const [zIndex_letter, setZIndex_letter] = useState(11);

  const handleToggle = () => {
    if (isOpen) {
      // ■ これから「閉じる」とき
      setIsOpen(false); // 1. まず手紙をしまい始める
      
      // 2. 1秒待って（手紙が完全に入って）から、フタを手前に戻す
      setTimeout(() => {
        setZIndex(20);
      }, 1000); // 1000ms = 1秒

    } else {
      // ■ これから「開く」とき
      setIsOpen(true);
      setZIndex(0); // 開くときは即座に奥にやってOK
      confetti({
        particleCount: 150, // 紙吹雪の数
        spread: 60,         // 広がる角度
        origin: { y: 0.6 }  // 発射位置（0.6は画面の下から60%の位置＝封筒のあたり）
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-pink-50 p-4">
      <h1 className="mb-8 text-2xl font-bold text-blue-800">
        お誕生日おめでとう！
      </h1>

      {/* 封筒の全体コンテナ */}
      <div 
        className="relative flex items-end justify-center cursor-pointer"
        style={{ width: 600, height: 400 }}
        onClick={handleToggle} // クリックで開く
      >
        
        {/* 1. 手紙の中身（スキャン画像） */}
        {/* 封筒の中に隠れていて、開くと上にスライドして出てきます */}
        <motion.div
          className="absolute bg-white shadow-lg p-4 text-sm text-gray-700"
          style={{ 
            width: "90%", 
            height: "80%",
            zIndex: 10, // 封筒の背中より手前、前の三角より奥
            bottom: 0 
          }}
          initial={{ y: 0 }}
          animate={isOpen ? { y: -120, scale: 1.1 } : { y: 0 }} // 上に移動して少し拡大
          transition={{ delay: 0.5, duration: 1 }} // 0.5秒待ってから1秒かけて移動
        >
          {/* ↓↓↓ ここに img タグを入れるとスキャン画像になります ↓↓↓ */}
          <div className="h-full w-full border-2 border-dashed border-gray-300 flex items-center justify-center">
             ここに手紙の<br/>画像が入ります
          </div>
          {/* ↑↑↑↑↑↑ */}
        </motion.div>

        {/* 2. 封筒の背面（奥側） */}
        <div className="absolute bottom-0 h-full w-full bg-blue-200 rounded-b-lg shadow-xl" style={{ zIndex: 0 }} />

        {/* 3. 封筒のフタ（三角形） */}
        <motion.div
          className="absolute top-0 w-0 h-0 border-l-[300px] border-r-[300px] border-t-[200px] border-l-transparent border-r-transparent border-t-teal-100 origin-top"
          style={{ zIndex: zIndex }}
          animate={{ rotateX: isOpen ? 180 : 0,
          }} // 180度回転して開く
          transition={{ 
            duration: 0.8,
            delay: isOpen ? 0 : 1,
            zIndex:{
              delay: isOpen ? 0 : 1,
            }
           }}
        />

        {/* 4. 封筒の前面（手前の三角形） */}
        {/* CSSで三角形を作っています */}
        <motion.div 
          className="absolute bottom-0 h-full w-full bg-teal-400 rounded-b-lg shadow-xl transparent"
          style={{ zIndex: 10 }}
          animate={{ opacity: isOpen ? 0 : 1}}
          transition={{
            duration : 0.75,
            delay : isOpen ? 0 : 1,
          }}
        />
      </div>

      <p className="mt-12 text-gray-500 text-sm">
        {isOpen ? "読んでくれてありがとう！" : "封筒をタップしてね"}
      </p>
    </div>
  );
}