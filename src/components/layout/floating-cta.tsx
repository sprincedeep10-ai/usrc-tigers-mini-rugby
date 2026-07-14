"use client";

import { Button } from "@/components/ui/button";
import { GAMEDAY_URL } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n/language-provider";
import { AnimatePresence, motion } from "framer-motion";

interface FloatingCTAProps {
  visible: boolean;
}

export function FloatingCTA({ visible }: FloatingCTAProps) {
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-40 p-4 sm:hidden"
        >
          <div className="rounded-2xl border border-tiger/30 bg-background/95 backdrop-blur-xl p-3 shadow-2xl shadow-black/20">
            <Button href={GAMEDAY_URL} size="lg" className="w-full">
              {t.common.registerFreeTrial}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
