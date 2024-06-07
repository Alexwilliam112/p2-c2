
export default function DefaultButton({ cb, tag }) {

    return (
        <div className="actionButton2" onClick={cb}>
            {tag}
        </div>
    )
}