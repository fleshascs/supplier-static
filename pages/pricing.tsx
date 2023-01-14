import Card from '../components/Card';

export default function Page() {
  return (
    <>
      <div className='flex flex-col lg:flex-row lg:space-x-4 pb-24 pt-16'>
        <div className='basis-1/3'>
          <Card>Pricing plan 1</Card>
        </div>

        <div className='basis-1/3'>
          <Card>Pricing plan 2</Card>
        </div>
        <div className='basis-1/3'>
          <Card>Pricing plan 3</Card>
        </div>
      </div>
    </>
  );
}
