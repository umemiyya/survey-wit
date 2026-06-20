import { Star } from 'lucide-react'

interface RatingInputProps {
  value: number
  onChange: (value: number) => void
  label?: string
  error?: string
}

export function RatingInput({
  value,
  onChange,
  label,
  error,
}: RatingInputProps) {
  return (
    <div>
      {label && (
        <label className="text-sm font-medium text-foreground mb-3 block">
          {label}
        </label>
      )}
      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() => onChange(rating)}
            className={`p-1 rounded-lg transition-all ${
              rating <= value
                ? 'text-amber-400 bg-amber-50'
                : 'text-muted-foreground hover:text-amber-300'
            }`}
          >
            <Star
              className="w-8 h-8 fill-current"
              strokeWidth={1}
            />
          </button>
        ))}
      </div>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  )
}
