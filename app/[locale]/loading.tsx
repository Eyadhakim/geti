export default function Loading() {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen flex items-center justify-center gap-2 bg-background z-50">
        <div className="loading-animation"></div>
        <div className="loading-animation" style={{ animationDelay: "0.3s" }}></div>
        <div className="loading-animation" style={{ animationDelay: "0.6s" }}></div>
      </div>
  )
}