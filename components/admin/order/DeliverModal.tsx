interface DeliverModalProps {
  onClose: () => void;
}
export const DeliverModal: React.FC<DeliverModalProps> = ({ onClose }) => {
  return (
    <section className=" flex flex-col item-center gap-y-5">
      <div className="flex flex-col  gap-5 justify-start">
        <div className="flex gap-1 items-start justify-center">
          <p></p>
          <p>:نام مشتری</p>
        </div>
        <div className="flex gap-1 items-start justify-center">
          <p>:آدرس</p>
          <p></p>
        </div>
        <div className="flex gap-1 items-start justify-center">
          <p>:تلفن</p>
          <p></p>
        </div>
        <div className="flex gap-1 items-start justify-center">
          <p>:زمان تحویل</p>
          <p></p>
        </div>
        <div className="flex gap-1 items-start justify-center">
          <p>:زمان سفارش</p>
          <p></p>
        </div>
      </div>
      <table className="w-full text-center">
        <thead className="text-center">
          <th>موجودی</th>
          <th>قیمت</th>
          <th>کالا</th>
        </thead>
        <tbody className="bg-base text-white">
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-end">
        <button className="px-2 w-20 py-1 rounded-md bg-green-500 te">
          تحویل شد
        </button>
      </div>
    </section>
  );
};
