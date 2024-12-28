import { colSpans } from '../../constants/tailwind-static-classnames'
import { cn } from '../../utils/cn'
import {
  Controller,
  useController
} from 'react-hook-form'

const TextField = ({
  readOnly = false,
  control,
  name,
  label,
  colSpan = 6,
  withCheckbox = false,
  isChecked = false,
  setIsChecked,
  placeholder = 'Enter text',
  actionButtonTitle,
  onClickActionButton,
  ActionButtonIcon,
  multiline = false,
  marginBottom = 'mb-5',
  refCallback,
  inputId,
  onBlur,
}) => {
  const { fieldState, field } = useController({ name, control })

  const errorMessage = fieldState.error?.message

  return (
    <>
      <div className={cn(colSpans[colSpan])}>
        <div className={cn(marginBottom)}>
          <label className="block text-sm font-normal text-neutral-950">
            {withCheckbox && setIsChecked && (
              <input
                className="form-check-input me-2"
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                id="checkebox-md"
              />
            )}
            {label}
          </label>
          <Controller
            control={control}
            name={name}
            render={() => (
              <div className="relative">
                <div className="flex items-center">
                  {multiline ? (
                    <textarea
                      id={inputId}
                      placeholder={placeholder}
                      value={field.value}
                      onChange={field.onChange}
                      disabled={(!isChecked && withCheckbox) || readOnly}
                      rows={4}
                      className={cn(
                        `block w-full rounded-xl border px-5 py-4 text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-[#f3f4f6] disabled:text-[#6b7280] sm:text-sm`,
                        errorMessage ? 'border-red/50' : 'border-neutral-200',
                        label ? 'mt-1' : ''
                      )}
                    />
                  ) : (
                    <input
                      id={inputId}
                      ref={(inputRef) => {
                        field.ref(inputRef)
                        if (refCallback) refCallback(inputRef)
                      }}
                      placeholder={placeholder}
                      value={field.value}
                      onBlur={onBlur}
                      onChange={field.onChange}
                      disabled={(!isChecked && withCheckbox) || readOnly}
                      className={cn(
                        `block w-full rounded-xl border px-5 py-4 text-black shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-[#f3f4f6] disabled:text-[#6b7280] sm:text-sm`,
                        errorMessage ? 'border-red-300' : 'border-neutral-200',
                        label ? 'mt-1' : ''
                      )}
                    />
                  )}
                </div>
                {actionButtonTitle && (
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center text-primary"
                    data-hs-overlay={`#primary-modal`}
                    onClick={onClickActionButton}
                  >
                    {ActionButtonIcon && (
                      <ActionButtonIcon className="size-5" />
                    )}

                    <span className="font-bold">{actionButtonTitle}</span>
                  </button>
                )}
                <div className="absolute -bottom-5">
                  {errorMessage ? (
                    <p className="text-sm text-red-500">{errorMessage}</p>
                  ) : null}
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </>
  )
}

export default TextField
