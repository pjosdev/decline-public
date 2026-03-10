"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export function EmptyState() {
  const router = useRouter();
  const pathname = usePathname();

  const clearAllFilters = () => {
    router.push(pathname);
  };

  return (
    <div className="text-center py-20">
      <p className="text-muted-foreground text-lg">
        No products found matching your filters.
      </p>
      <p className="text-muted-foreground text-sm mt-2">
        Try adjusting your search criteria.
      </p>
      <Button 
        variant="secondary" 
        onClick={clearAllFilters}
        className="mt-6"
      >
        <X className="w-4 h-4 mr-2" />
        Clear filters
      </Button>
    </div>
  );
}
