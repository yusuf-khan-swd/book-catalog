import WishlistCard from '@/components/WishlistCard';
import { useGetWishlistQuery } from '@/redux/features/wishlist/wishlistApi';
import { useAppSelector } from '@/redux/hooks';
import { IWishlist } from '@/types/globalTypes';
import { Key } from 'react';

const Wishlist = () => {
  const { user, isLoading: userLoading } = useAppSelector(
    (state) => state.user
  );

  const { data: wishlistData, isLoading } = useGetWishlistQuery(user.email, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <div className="min-h-screen">
      <div className="grid max-w-7xl mx-auto relative ">
        <div className="grid grid-cols-3 gap-10 pb-20">
          {wishlistData?.map(
            (wishlist: IWishlist, index: Key | null | undefined) => (
              <WishlistCard key={index} book={wishlist.book} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
