import {
  Accessibility,
  Archive,
  ArrowRightFromLine,
  Bath,
  Bed,
  Book,
  Building2,
  Calendar,
  Car,
  Check,
  CircleHelp,
  Crown,
  Diamond,
  DollarSign,
  Droplets,
  Flame,
  Gem,
  Grid3x3,
  Hammer,
  Home,
  Info,
  Key,
  Layers,
  LayoutGrid,
  Leaf,
  Lightbulb,
  Maximize2,
  Minus,
  PaintRoller,
  Plug,
  Plus,
  Refrigerator,
  Repeat,
  ShowerHead,
  Sofa,
  Sparkles,
  Square,
  Star,
  Tag,
  TreePine,
  TrendingUp,
  Wrench,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";

// Contextual icon per option label, shared by every choice style so a
// question's options read as more than a bare A/B/C list without every
// survey having to hand-assign an icon per option. Order matters: more
// specific phrases are checked before the generic words they contain.
export function getOptionIcon(label: string): LucideIcon | null {
  const l = label.toLowerCase();

  if (l === "yes") return Check;
  if (l === "no" || l.startsWith("don't")) return X;
  if (l.includes("not sure")) return CircleHelp;
  if (l.includes("not yet") || l.includes("just gather")) return Info;
  if (l.includes("as soon") || l.includes("asap")) return Zap;
  if (l.includes("within") && l.includes("month")) return Calendar;
  if (l.includes("gathering") || l.includes("research")) return Book;

  if (l.includes("apartment")) return Building2;
  if (l.includes("multi") && l.includes("storey")) return Layers;
  if (l.includes("second-storey")) return Layers;
  if (l.includes("storey")) return Home;
  if (l.includes("own the land") || l.includes("own land")) return Key;
  if (l.includes("buying land")) return Tag;
  if (l.includes("knockdown") || l.includes("rebuild")) return Hammer;
  if (l.includes("ground-floor")) return ArrowRightFromLine;
  if (l.includes("wrap-around")) return Repeat;
  if (l.includes("granny") || l.includes("whole house") || l.includes("accommodation")) return Home;
  if (l.includes("master")) return Crown;
  if (l.includes("multi-purpose") || l.includes("open plan")) return LayoutGrid;
  if (l.includes("addition") || l.includes("additional") || l.includes("want to add")) return Plus;
  if (l.includes("keeping")) return Check;

  if (l.includes("portable")) return ShowerHead;
  if (l.includes("shower")) return ShowerHead;
  if (l.includes("bedroom")) return Bed;
  if (l.includes("bathroom") || l.includes("bathtub")) return Bath;
  if (l.includes("living") || l.includes("dining")) return Sofa;

  if (l === "none" || l.includes("none required")) return Minus;
  if (l.includes("triple") || l.includes("double vanity"))
    return l.includes("vanity") ? Droplets : Car;
  if (
    l.includes("double") ||
    (l.includes("single") && !l.includes("storey") && !l.includes("wall"))
  )
    return Car;

  if (l.includes("economy") || l.includes("budget")) return Leaf;
  if (l.includes("standard")) return Star;
  if (l.includes("premium") || l.includes("luxury")) return Diamond;

  if (l.includes("complete")) return Hammer;
  if (l.includes("partial") || l.includes("fixtures")) return Wrench;
  if (l.includes("resale")) return TrendingUp;
  if (l.includes("space")) return Maximize2;
  if (l.includes("look") || l.includes("modernize")) return Sparkles;
  if (l.includes("layout") || l.includes("shaped") || l.includes("galley") || l.includes("wall"))
    return Layers;
  if (l.includes("storage") || l.includes("cabinet")) return Archive;
  if (l.includes("accessib")) return Accessibility;

  if (
    l.includes("quartz") ||
    l.includes("granite") ||
    l.includes("porcelain") ||
    l.includes("countertop")
  )
    return Gem;
  if (l.includes("tile") || l.includes("splashback")) return Grid3x3;
  if (l.includes("glass")) return Square;
  if (l.includes("hardwood")) return TreePine;
  if (l.includes("vinyl") || l.includes("laminate") || l.includes("flooring")) return Layers;
  if (l.includes("appliance")) return Refrigerator;
  if (l.includes("faucet") || l.includes("sink") || l.includes("plumbing")) return Droplets;
  if (l.includes("lighting")) return Lightbulb;
  if (l.includes("electrical")) return Plug;
  if (l.includes("gas")) return Flame;
  if (l === "other") return PaintRoller;

  if (l.startsWith("$") || l.startsWith("under $")) return DollarSign;

  return null;
}
