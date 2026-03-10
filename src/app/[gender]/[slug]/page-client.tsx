"use client";

import { Container } from "@/components/layout/container";
import ProductImages from "@/components/products/product-images";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { ProductSizesType, ProductType } from "@/data/types";
import { Check } from "lucide-react";
import { useEffect, useEffectEvent, useState } from "react";
import { useCart } from "@/components/cart/cart-context";
import {
  DetailsDescription,
  DetailsMobile,
  DetailsDesktop,
  SizeSelection,
} from "./components";

interface ProductPageClientProps {
  product: ProductType;
  gender: string;
}

export default function ProductPageClient({
  product,
  gender,
}: ProductPageClientProps) {
  const [selectedSize, setSelectedSize] = useState<ProductSizesType | null>(
    null,
  );

  const { addItem, setIsOpen, items } = useCart();

  const isInCart = items.find((item) => item.id.includes(product.id));

  const handleRemoveItemFromCart = useEffectEvent(() => {
    if (isInCart) {
      return;
    } else {
      setSelectedSize(null);
    }
  });

  useEffect(() => {
    handleRemoveItemFromCart();
  }, [isInCart]);

  const handleUpdateSelectedSize = (size: ProductSizesType) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      return;
    }

    if (isInCart) {
      setIsOpen(true);
      return;
    }

    addItem({
      product,
      size: selectedSize,
      quantity: 1,
    });
  };

  const numReviews = product.reviews?.length;
  const rating = numReviews
    ? product.reviews?.reduce((acc, curr) => curr.rating + acc, 0)
    : null;
  const average = rating && numReviews ? rating / numReviews : null;

  return (
    <Container>
      <div className="col-span-full lg:col-span-4 xl:col-span-3">
        <div className="pt-10">
          <DetailsDescription product={product} gender={gender} />
          <div className="fade-in">
            {!isInCart && (
              <SizeSelection
                selectedSize={selectedSize}
                onUpdateSelectedSize={handleUpdateSelectedSize}
                product={product}
                itemInCart={isInCart ? true : false}
              />
            )}
          </div>
          <div className="py-10 border-b">
            {isInCart ? (
              <Button className="w-full h-12" onClick={() => setIsOpen(true)}>
                <Check className="w-4 h-4 mr-2" />
                Added to cart - Open Cart
              </Button>
            ) : (
              <>
                <Button
                  className="w-full h-12"
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                >
                  Add to Cart
                </Button>
                {!selectedSize && (
                  <Typography
                    variant="body"
                    className="text-muted-foreground text-center mt-2"
                  >
                    Please select a size to add to cart
                  </Typography>
                )}
              </>
            )}
          </div>
          <DetailsMobile product={product} average={average} />
          <DetailsDesktop product={product} average={average} />
        </div>
      </div>
      {/* images desktop lg and > */}
      <div className="hidden lg:block lg:col-span-9 2xl:col-start-5 2xl:col-span-8 lg:col-start-6 pt-10">
        <ProductImages images={product.images} expandable={true} />
      </div>
    </Container>
  );
}
