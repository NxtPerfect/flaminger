import { ContractType } from '@/app/lib/definitions'
import React from 'react'
import BusinessSvg from '../molecules/BusinessSvg'
import EmploymentContractSvg from '../molecules/EmploymentContractSvg'

export default function ContractTypeInfo({ contractType }: { contractType: ContractType }) {
  const SvgType: { [key in ContractType]: React.ReactNode } = {
    b2b: <BusinessSvg imageAlt='' />,
    contract: <EmploymentContractSvg imageAlt='' />,
  }
  return (
    <div className="flex flex-row gap-1">
      {SvgType[contractType] || <BusinessSvg imageAlt='' />}
      <span>
        {contractType === "b2b" ? "B2B" : "Contract"}
      </span>
    </div>
  )
}
