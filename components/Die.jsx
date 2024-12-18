export default function Die(props) {
    const style = {
        backgroundColor: props.held ? 'lightgreen' : 'white',
    };

    // Function to generate dots based on the value of the die
    function dot() {
        const dots = [];
        for (let i = 0; i < props.value; i++) {
            dots.push(<span key={i}>•</span>); // Using a dot instead of Numbers
        }
        return dots;
    }
    return (
        <div style={style} onClick={props.holdDice} className="bg-white h-[65px] w-[65px] border rounded-2xl flex justify-center cursor-pointer">
            <h1 className="grid grid-cols-2 grid-rows-3 text-3xl gap-x-3 pb-7">{dot()}</h1>
            <h1 className='text-gray-300  absolute flex items-center justify-center text-6xl font-bold mix-blend-overlay'>{props.value}</h1>
        </div>
    );
}
