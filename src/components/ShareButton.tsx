
import { useState } from 'react';
import { Facebook, Twitter, Linkedin, Share2, Copy, X, MessageCircle, Instagram, Mail, Link } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ShareButtonProps {
  url: string;
  title: string;
}

const ShareButton = ({ url, title }: ShareButtonProps) => {
  const [isSharing, setIsSharing] = useState(false);
  
  const shareUrl = encodeURIComponent(url);
  const shareTitle = encodeURIComponent(title);
  
  // Check if navigator.share is available (mobile devices mostly)
  const canUseNativeShare = typeof navigator !== 'undefined' && !!navigator.share;
  
  const handleNativeShare = async () => {
    if (!canUseNativeShare) return;
    
    try {
      setIsSharing(true);
      await navigator.share({
        title,
        url,
      });
      toast.success('Shared successfully');
    } catch (error) {
      // User cancelled or sharing failed
      console.error('Error sharing:', error);
    } finally {
      setIsSharing(false);
    }
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)
      .then(() => {
        toast.success('Link copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
        toast.error('Failed to copy link');
      });
  };

  const shareToWhatsApp = () => {
    window.open(`https://wa.me/?text=${shareTitle}%20${shareUrl}`, '_blank');
  };
  
  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank');
  };
  
  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`, '_blank');
  };
  
  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, '_blank');
  };
  
  const shareToInstagram = () => {
    // Best approach for Instagram - try native sharing first on mobile
    if (canUseNativeShare) {
      handleNativeShare();
    } else {
      // On desktop or if native sharing fails
      toast.info('Instagram sharing requires the Instagram app. Link copied to clipboard instead.');
      copyToClipboard();
    }
  };
  
  const shareByEmail = () => {
    window.open(`mailto:?subject=${shareTitle}&body=${shareUrl}`, '_blank');
  };

  return (
    <div className="inline-block">
      {canUseNativeShare ? (
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2" 
          onClick={handleNativeShare}
          disabled={isSharing}
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={shareToWhatsApp}>
              <MessageCircle className="mr-2 h-4 w-4" />
              <span>WhatsApp</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={shareToFacebook}>
              <Facebook className="mr-2 h-4 w-4" />
              <span>Facebook</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={shareToTwitter}>
              <X className="mr-2 h-4 w-4" />
              <span>Twitter</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={shareToLinkedIn}>
              <Linkedin className="mr-2 h-4 w-4" />
              <span>LinkedIn</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={shareToInstagram}>
              <Instagram className="mr-2 h-4 w-4" />
              <span>Instagram</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={shareByEmail}>
              <Mail className="mr-2 h-4 w-4" />
              <span>Email</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={copyToClipboard}>
              <Copy className="mr-2 h-4 w-4" />
              <span>Copy link</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default ShareButton;
