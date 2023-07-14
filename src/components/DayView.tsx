export default function DayView({ entries }: { entries: Journal[] }) {
  return (
    <div className="pb-4 pt-2 mx-4">
      <p className="text-blue-500 font-semibold">
        {new Date(entries[0].created_at).toDateString()}
      </p>
      <div className="rounded-xl bg-blue-100" >
        {entries.map((journal) => (
          <div
            key={journal.id}
            className="py-2 px-4"
          >
            <p className="text-teal-600 text-sm">
              {new Date(journal.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p className="font-semibold">{journal.title}</p>
            <p>{journal.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
