import WishlistCard from '@/components/WishlistCard';
import { Button } from '@/components/ui/button';
import { useGetWishlistQuery } from '@/redux/features/wishlist/wishlistApi';
import { useAppSelector } from '@/redux/hooks';
import { IWishlist } from '@/types/globalTypes';
import { Key, useState } from 'react';

const Wishlist = () => {
  const [filterWishlistData, setFilterWishlistData] = useState([]);
  const [isFilterData, setIsFilterData] = useState('');

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

  const handleAllWishlist = () => {
    setFilterWishlistData(wishlistData);
    setIsFilterData('All');
  };

  const handleReadingNow = () => {
    const result = wishlistData.filter(
      (data: IWishlist) => data.currentlyReading === true
    );
    setFilterWishlistData(result);
    setIsFilterData('Reading Now');
  };
  const handlePlanToRead = () => {
    const result = wishlistData.filter(
      (data: IWishlist) => data.planToRead === true
    );
    setFilterWishlistData(result);
    setIsFilterData('Plan to Read');
  };
  const handleFinished = () => {
    const result = wishlistData.filter(
      (data: IWishlist) => data.finished === true
    );
    setFilterWishlistData(result);
    setIsFilterData('Finished');
  };

  return (
    <div className="min-h-screen">
      {wishlistData.length === 0 && (
        <p className="mx-2 my-3">No book added in wishlist</p>
      )}
      {wishlistData.length > 0 && (
        <div className="grid max-w-7xl mx-auto relative ">
          <div className="flex mb-3">
            <Button variant="link" onClick={handleAllWishlist}>
              All
            </Button>
            <Button variant="link" onClick={handleReadingNow}>
              Reading Now
            </Button>
            <Button variant="link" onClick={handlePlanToRead}>
              Plan to read
            </Button>
            <Button variant="link" onClick={handleFinished}>
              Finished
            </Button>
          </div>
          {filterWishlistData.length === 0 && isFilterData && (
            <p className="mx-2 my-3">No book added in {isFilterData}</p>
          )}
          <div className="grid grid-cols-3 gap-10 pb-20">
            {filterWishlistData.length > 0 &&
              filterWishlistData?.map(
                (wishlist: IWishlist, index: Key | null | undefined) => (
                  <WishlistCard key={index} wishlist={wishlist} />
                )
              )}
            {!isFilterData &&
              wishlistData?.map(
                (wishlist: IWishlist, index: Key | null | undefined) => (
                  <WishlistCard key={index} wishlist={wishlist} />
                )
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
