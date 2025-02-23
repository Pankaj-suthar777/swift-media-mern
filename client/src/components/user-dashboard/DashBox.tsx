interface Props {
  text: string;
  value: number | undefined;
}

const DashBox = ({ text, value }: Props) => {
  return (
    <div className="bg-white rounded-md h-fit py-4 w-full flex justify-center items-center">
      <span className="font-medium text-sm">{text}&nbsp;</span> :{" "}
      <span className="font-medium text-sm">&nbsp;{value}</span>
    </div>
  );
};

export default DashBox;
