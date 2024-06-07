
export default function ActionButton({ cb, tag }) {

    return (
        <div className="actionButton" onClick={cb}>
            {tag}
        </div>
    )
}