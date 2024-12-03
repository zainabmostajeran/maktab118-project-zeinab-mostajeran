import PageTitle from "@/components/admin/PageTitle";
import Card , {  CardProps } from "../../components/admin/Card";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import TableOne  from "@/components/admin/TableOne";

const cardData: CardProps[] = [
  {
    label: "کل درآمد",
    amount: "+45,231.89",
    discription: " +20.1%",
    icon: DollarSign
  },
  {
    label: "دنبال کننده ها",
    amount: "+2350",
    discription: "+180.1% ",
    icon: Users
  },
  {
    label: "فروش ها",
    amount: "+12,234",
    discription: "+19% ",
    icon: CreditCard
  },
  {
    icon: Activity,
    label: "اکنون فعال است",
    amount: "+573",
    discription: "+201",
    
  }
];
const DashboardPage: React.FC = () => {
  return (
    <section className="flex flex-col gap-5 px-4 w-full">
        <PageTitle className="text-right" title="داشبورد" />
        <div className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4 text-center">
        {cardData.map((d, i) => (
          <Card 
            key={i}
            amount={d.amount}
            discription={d.discription}
            label={d.label}
            icon={d.icon}
            
          />
        ))}
        </div>
        <div className="flex justify-between">
        <TableOne/>
        </div>
      
    </section>
  );
};

export default DashboardPage;
