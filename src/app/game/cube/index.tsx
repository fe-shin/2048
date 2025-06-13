import classNames from 'classnames'

interface Props {
  value: number
  className?: string
}

function Cube({ value, className }: Props) {
  return (
    <div
      className={classNames(
        `w-16 h-16 flex items-center justify-center border`,
        {
          'bg-blue-500 text-white': value,
          'bg-gray-200': !value,
        },
        className,
      )}
    >
      {value}
    </div>
  )
}

export { Cube }
