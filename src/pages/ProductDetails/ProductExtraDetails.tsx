import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardDescription } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const MockReviews = [
  {
    id: 1,
    title: "Comfortable and Functional",
    author: "Ranindra95",
    reviewDate: "25 Aug 2025",
    rating: 5,
    review:
      "The fit is supportive and comfortable right out of the box. The cushioning feels responsive without being too soft, which makes it great for both daily runs and long walks. It hugs the foot nicely, especially around the heel, giving a stable ride. The design is sleek and eye-catching. The bright pink color stands out in the best way, and the black swoosh gives it a nice contrast. It's stylish enough to wear casually, not just for running.The mesh upper feels breathable and lightweight, which helps keep feet cool during workouts. I loved the stability and cushioning—it feels supportive without being heavy. The vibrant design is also a big plus. If I could change one thing, I'd like a little more room in the toe box for extra comfort on longer runs.",
  },
  {
    id: 2,
    title: "READ BEFORE YOU BUY",
    author: "Nik80075075",
    reviewDate: "14 sept 2025",
    rating: 4,
    review:
      "Guys, these particular shoes are half size smaller than usual Nike shoes, so go for half size more.",
  },
];

const ProductExtraDetails = () => {
  const [showID, setShowID] = useState<number | null>(null);

  const handleShowMoreReview = (id: number) => {
    if (id === showID) setShowID(null);
    else setShowID(id);
  };
  return (
    <Accordion type="multiple" className="w-full mt-12">
      <p className="text-lg underline font-medium">View Product Details</p>
      {/* size and fit */}
      <AccordionItem value="item-1">
        <AccordionTrigger className="hover:no-underline text-lg font-medium">
          Size & Fit
        </AccordionTrigger>
        <AccordionContent className="my-1">
          <ul className="list-disc ml-5">
            <li className="font-medium">
              Fits small; we recommend ordering half a size up
            </li>
            {/* <Link to="https://www.nike.com/in/size-fit/womens-footwear">
              <li className="font-semibold text-[15px] border-b-2 border-black w-fit">
                Size Guide
              </li>
            </Link> */}
          </ul>
        </AccordionContent>
      </AccordionItem>

      {/* delivery and returns */}
      <AccordionItem value="item-2">
        <AccordionTrigger className="hover:no-underline text-lg font-medium">
          Delivery & Returns
        </AccordionTrigger>
        <AccordionContent className="my-1 font-medium">
          <p>All purchases are subject to delivery fees.</p>
          <ul className="list-disc ml-5 my-3">
            <li>Standard delivery 4-9 business days</li>
          </ul>
          <p>
            Orders are processed and delivered Monday- Friday (excluding public
            holidays)
          </p>
          <p className="mt-2">
            Runique Members enjoy{" "}
            <Link to="/">
              <span className="font-semibold cursor-pointer">
                free returns.
              </span>
            </Link>
          </p>
        </AccordionContent>
      </AccordionItem>

      {/* reviews */}
      <AccordionItem value="item-3">
        <AccordionTrigger className="hover:no-underline text-lg font-medium">
          Reviews ({MockReviews.length})
        </AccordionTrigger>
        <AccordionContent className="my-1 font-medium space-y-8">
          {MockReviews.map((review) => (
            <Card className="p-4 shadow-none border gap-0" key={review.id}>
              <p className="font-semibold">{review.title}</p>
              <div className="flex items-center justify-between mt-2">
                <RenderStars stars={review.rating} />
                <p className="text-gray-500">
                  {review.author} - {review.reviewDate}
                </p>
              </div>
              {/* description */}
              <CardDescription
                className={`mt-4 text-black font-normal ${
                  showID === review.id ? "line-clamp-none" : "line-clamp-4"
                }`}
              >
                {review.review}
              </CardDescription>
              <button
                onClick={() => handleShowMoreReview(review.id)}
                className={`text-start border-b-2 w-fit border-black cursor-pointer my-2 ${
                  review.review.length > 756 ? "block" : "hidden"
                }`}
              >
                {showID === review.id ? "Less" : "More"}
              </button>
            </Card>
          ))}
        </AccordionContent>
      </AccordionItem>

      {/* product information */}
      <AccordionItem value="item-4">
        <AccordionTrigger className="hover:no-underline text-lg font-medium">
          Product Information
        </AccordionTrigger>
        <AccordionContent className="my-1 font-medium">
          <p>
            Declaration of Importer: Direct import by the individual customer
          </p>

          <p className="mt-8">
            Marketed by: Runique Global Trading B.V. Nepal Branch, Mitrapark -
            Kathmandu, Nepal.
          </p>
          <p className="font-semibold mt-4">Net Quantity: 1 Pair</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductExtraDetails;

const RenderStars = ({ stars }: { stars: number }) => {
  return (
    <div className="flex">
      {Array(stars)
        .fill(null)
        .map((_, index) => (
          <Star fill="black" stroke="0" size={16} key={index} />
        ))}
    </div>
  );
};
