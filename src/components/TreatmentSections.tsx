import { motion } from "framer-motion";
import { Droplets, Target } from "lucide-react";
import type { TreatmentSection } from "@/data/treatments";

interface Props {
  sections: TreatmentSection[];
}

const TreatmentSections = ({ sections }: Props) => {
  return (
    <div className="space-y-10">
      {sections.map((section, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <h3 className="font-display text-xl font-bold text-foreground mb-4">
            {section.title}
          </h3>

          {section.text && (
            <p className="font-body text-muted-foreground leading-relaxed">
              {section.text}
            </p>
          )}

          {section.items && (
            <div className="grid gap-4">
              {section.items.map((item, i) => (
                <div
                  key={i}
                  className="bg-gradient-soft rounded-2xl border border-border p-5 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 bg-gradient-hero rounded-xl flex items-center justify-center flex-shrink-0">
                      <Droplets className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <h4 className="font-display text-base font-semibold text-foreground">
                      {item.name}
                    </h4>
                  </div>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-2">
                    {item.description}
                  </p>
                  {item.actives && (
                    <p className="font-body text-xs text-primary/80 bg-primary/5 rounded-lg px-3 py-1.5 inline-block mb-2">
                      <span className="font-semibold">Ativos:</span> {item.actives}
                    </p>
                  )}
                  {item.quote && (
                    <p className="font-display text-sm italic text-primary mt-1">
                      "{item.quote}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {section.indications && (
            <div className="grid sm:grid-cols-2 gap-3">
              {section.indications.map((ind, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-soft-pink"
                >
                  <div className="w-5 h-5 rounded-full bg-gradient-hero flex items-center justify-center flex-shrink-0">
                    <Target className="w-3 h-3 text-primary-foreground" />
                  </div>
                  <span className="font-body text-sm text-foreground">{ind}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default TreatmentSections;
