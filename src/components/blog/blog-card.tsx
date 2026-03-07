import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

interface BlogCardProps {
  title: string;
  description: string;
  slug: string;
  date: string;
  image: string;
  tags: string[];
  readingTime: number;
}

export function BlogCard({
  title,
  description,
  slug,
  date,
  image,
  tags,
  readingTime,
}: BlogCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link href={`/blog/${slug}`} className="group block h-full">
      <Card className="h-full border-gray-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <CardHeader className="p-5 pb-3">
          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <CardTitle className="text-xl font-bold leading-tight group-hover:text-emerald-600 transition-colors">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="px-5 pb-5">
          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {description}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>{readingTime} min di lettura</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
