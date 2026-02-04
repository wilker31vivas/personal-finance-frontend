type ErrorProps = {
  title: string
  description?: string
  onRetry(): void
}

export default function ErrorMessage({ title, description = "Server connection error", onRetry }: ErrorProps) {
   return (
      <div className="flex sm:flex-row sm:justify-between flex-col items-center gap-4 rounded-lg border border-red-200 bg-red-50 px-6 py-4">
        <div className="flex items-center justify-center gap-3">
          <span className="text-red-500 text-lg sm:text-2xl">❗</span>
          <div>
            <p className="font-semibold text-red-700">{title}</p>
            {description && (
              <p className="text-sm text-red-600">{description}</p>
            )}
          </div>
        </div>

        {onRetry && (
          <button
            onClick={onRetry}
            className="cursor-pointer rounded-md bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600 transition"
          >
            Retry
          </button>
        )}
      </div>
    );
}