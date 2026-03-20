const styles = {
  pending: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40",
  approved: "bg-green-500/20 text-green-400 border border-green-500/40",
  rejected: "bg-red-500/20 text-red-400 border border-red-500/40",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`text-xs font-bold px-2 py-1 rounded capitalize ${styles[status] || styles.pending}`}>
      {status}
    </span>
  );
}
