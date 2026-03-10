"use client";

import { useState, useEffect, useEffectEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Share2, Link2, Mail, Facebook, Instagram } from "lucide-react";
import { toast } from "sonner";

interface ShareProps {
  title: string;
  description?: string;
}

export function Share({ title, description }: ShareProps) {
  const [hasNativeShare, setHasNativeShare] = useState(false);
  const [url, setUrl] = useState("");

  const handleSetSharePolicy = useEffectEvent(
    (isMobile: boolean, hasShareAPI: boolean) => {
      setHasNativeShare(isMobile && hasShareAPI);
      setUrl(window.location.href);
    },
  );

  useEffect(() => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );
    handleSetSharePolicy(isMobile, !!navigator.share);
  }, []);

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title,
        text: description,
        url,
      });
    } catch (err) {
      // User cancelled or share failed - ignore
    }
  };

  const handleShare = (platform: string) => {
    const shareText = `${title}${description ? ` - ${description}` : ""}`;
    let shareUrl = "";

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText + " " + url)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "instagram":
        toast.info("Copy the link to share on Instagram");
        return;
      case "email":
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(shareText + "\n\n" + url)}`;
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard");
        return;
    }

    if (shareUrl) {
      window.open(
        shareUrl,
        "_blank",
        "width=600,height=400,noopener,noreferrer",
      );
    }
  };

  return (
    <div className="flex items-center gap-4 h-4 w-full">
      {hasNativeShare ? (
        <Button variant="ghost" size="sm" onClick={handleNativeShare}>
          Share <Share2 className="h-4 w-4" />
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">
              Share <Share2 className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="rounded-none w-auto">
            <DropdownMenuItem
              onClick={() => handleShare("whatsapp")}
              className="w-auto rounded-none"
            >
              WhatsApp
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleShare("facebook")}
              className="w-auto rounded-none"
            >
              Facebook
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleShare("instagram")}
              className="w-auto rounded-none"
            >
              Instagram
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleShare("email")}
              className="w-auto rounded-none"
            >
              Email
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleShare("copy")}
              className="w-auto rounded-none"
            >
              Copy link
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
