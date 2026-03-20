import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { TreatmentCategory } from "@/data/treatments";

// Image imports map
import imgDrenagem from "@/assets/treatment-drenagem.jpg";
import imgBody from "@/assets/treatment-body.jpg";
import imgHifu from "@/assets/treatment-hifu.jpg";
import imgLaser from "@/assets/treatment-laser.jpg";
import imgFacial from "@/assets/treatment-facial.jpg";
import imgDesign from "@/assets/treatment-design.jpg";
import imgMassage from "@/assets/treatment-massage.jpg";
import imgHair from "@/assets/treatment-hair.jpg";
import imgDrenagemLinfatica from "@/assets/treatment-drenagem-linfatica.jpg";
import imgPressoterapia from "@/assets/treatment-pressoterapia.jpg";
import imgMantaTermica from "@/assets/treatment-manta-termica.jpg";
import imgDetoxPes from "@/assets/treatment-detox-pes.jpg";

const imageMap: Record<string, string> = {
  "treatment-drenagem": imgDrenagem,
  "treatment-body": imgBody,
  "treatment-hifu": imgHifu,
  "treatment-laser": imgLaser,
  "treatment-facial": imgFacial,
  "treatment-design": imgDesign,
  "treatment-massage": imgMassage,
  "treatment-hair": imgHair,
  "treatment-drenagem-linfatica": imgDrenagemLinfatica,
  "treatment-pressoterapia": imgPressoterapia,
  "treatment-manta-termica": imgMantaTermica,
  "treatment-detox-pes": imgDetoxPes,
};

export const getImage = (key: string) => imageMap[key] || imgFacial;

interface CategoryCardProps {
  category: TreatmentCategory;
  index: number;
}

const CategoryCard = ({ category, index }: CategoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link
        to={`/categoria/${category.slug}`}
        className="group block relative overflow-hidden rounded-2xl aspect-[3/4] sm:aspect-[4/5]"
      >
        <img
          src={getImage(category.image)}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />
        
        {/* Icon */}
        <div className="absolute top-4 left-4 text-2xl bg-background/20 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center">
          {category.icon}
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
          <h3 className="font-display text-xl sm:text-2xl font-bold text-primary-foreground mb-1">
            {category.name}
          </h3>
          <p className="font-body text-sm text-primary-foreground/70 mb-3 line-clamp-2">
            {category.subtitle}
          </p>
          <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold font-body group-hover:gap-3 transition-all">
            Ver tratamentos
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
