import WishlistCard from '@/components/WishlistCard';
import { useGetWishlistQuery } from '@/redux/features/wishlist/wishlistApi';
import { useAppSelector } from '@/redux/hooks';
import { IWishlist } from '@/types/globalTypes';
import { Key } from 'react';

const Wishlist = () => {
  const { user, isLoading: isUserLoading } = useAppSelector(
    (state) => state.user
  );

  const { data: wishlistData, isLoading: isWishlistLoading } =
    useGetWishlistQuery(user.email, {
      refetchOnMountOrArgChange: true,
    });

  if (isUserLoading || isWishlistLoading) {
    return <p className="min-h-screen text-center">Loading...</p>;
  }

  return (
    <div className="min-h-screen">
      {wishlistData.length < 1 && <p>No book added in wishlist</p>}
      <div className="grid max-w-7xl mx-auto relative ">
        <div className="grid grid-cols-3 gap-10 pb-20">
          {wishlistData?.map(
            (wishlist: IWishlist, index: Key | null | undefined) => (
              <WishlistCard key={index} wishlist={wishlist} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
