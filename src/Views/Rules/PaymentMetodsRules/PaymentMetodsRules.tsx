import { FC } from 'react'
import { getPmRulesSummary } from './../../../Service/Rules'
import './PaymentMethodRules.scss'

interface IProps {
  merchantId: string
}

const PaymentMethodsRules: FC<any> = (props: IProps) => {
  const { merchantId } = props

  const fetchPmSummary = async () => {
    const data =  await getPmRulesSummary(merchantId)
  }

  fetchPmSummary()

  return (
    <div className='w-full mx-auto p-2'>
      <div className='w-full h-10 border-2 rounded-3xl text-left'>
        <input className='border-0 self-start mt-2 ml-4 text-sm w-3/12 outline-none' type='text' placeholder='Search a txId or search by column' />

      </div>
      <button className='mt-2 bg-blue-500 self-end hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
        Add payment method(s)
      </button>

    </div>
  )
}

export default PaymentMethodsRules