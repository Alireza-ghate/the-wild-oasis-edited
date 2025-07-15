import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinsCount }) {
  // 1)
  const numBookings = bookings.length;

  // 2. sum of totalPrice of evry booking in bookings[]
  const sales = bookings?.reduce((acc, booking) => acc + booking.totalPrice, 0);

  // 3.
  const checkins = confirmedStays.length;

  // 4.
  // num checked in nights / all avalbale nights (num days * num cabins)
  const occupation =
    confirmedStays?.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinsCount);

  return (
    <>
      <Stat
        value={numBookings}
        color="blue"
        icon={<HiOutlineBriefcase />}
        title="Bookings"
      />
      <Stat
        value={formatCurrency(sales)}
        color="green"
        icon={<HiOutlineBanknotes />}
        title="Sales"
      />
      <Stat
        value={checkins}
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        title="Check ins"
      />
      <Stat
        value={Math.round(occupation * 100) + "%"}
        color="yellow"
        icon={<HiOutlineChartBar />}
        title="Occupancy rate"
      />
    </>
  );
}

export default Stats;
