import React from "react";

export default function ProjectCard({
  image,
  title,
  description,
  tags = [],
  link,
}) {
  return (
    <div
      className="
        group relative overflow-hidden rounded-2xl
        bg-white/5 backdrop-blur-xl border border-white/10
        shadow-[0_0_40px_rgba(139,92,246,0.08)]
        hover:shadow-[0_0_60px_rgba(139,92,246,0.2)]
        transition-all duration-300
      "
    >
      {/* Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="
            h-full w-full object-cover
            group-hover:scale-105 transition-transform duration-500
          "
        />
      </div>
       <div
          className="
            absolute inset-0 bg-purple-300/10
            opacity-0 group-hover:opacity-100
            flex items-center justify-center gap-4
            transition-opacity duration-300
          "
        ></div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-white mb-2">
          {title}
        </h3>

        <p className="text-white/60 text-sm leading-relaxed mb-4">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="
                text-xs px-3 py-1 rounded-full
                bg-purple-500/10 text-purple-300
                border border-purple-500/20
              "
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Link */}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="
              inline-flex items-center gap-2
              text-sm font-medium text-purple-400
              hover:text-purple-300 transition
            "
          >
            View Details →
          </a>

        )}
        
      </div>
    </div>
  );
}
