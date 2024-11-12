"use client";
import React from "react";

import { Button } from "@/components/ui/button";

type DeleteArertProps = {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteArert: React.FC<DeleteArertProps> = ({ isOpen, message, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50">
      <div className="rounded bg-white p-6 shadow-md">
        <p className="mb-4">{message}</p>
        <div className="flex justify-center gap-4">
          <Button onClick={onClose} className="rounded bg-gray-300 px-4 py-2 text-black hover:bg-gray-400">
            キャンセル
          </Button>
          <Button onClick={onConfirm} className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
            削除
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteArert;
