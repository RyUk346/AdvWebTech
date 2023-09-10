import axios from "axios";
import { useRouter } from 'next/router'



export default function allServices (){
    const router = useRouter();
    const service= router.query.id;

        return(
            <>
            {service}
            </>
        )
}