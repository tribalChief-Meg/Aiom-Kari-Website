import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    quantity: { type: Number, required: true },
    category: { type: ObjectId, ref: "Category", required: true },
    subcategory: { type: ObjectId, ref: "Subcategory"},
    description: { type: String, required: true },
    detail: { type: Map, of: String, required: true }, 

    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    actualPrice: { type: Number, required: true, default: 0 },
    discountPercentage: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);


productSchema.virtual('discountedPrice').get(function() {
  return this.actualPrice * (1 - this.discountPercentage / 100);
});

const Product = mongoose.model("Product", productSchema);
export default Product;
