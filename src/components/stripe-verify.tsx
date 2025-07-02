import { Button } from '@payloadcms/ui';
import Link from 'next/link';




export const StripeVerify = () => {

  return (
    <Link href={"/stripe-verify"} className='p-4'>
      <Button>
        Verify account
      </Button>
    </Link>
  )
}
