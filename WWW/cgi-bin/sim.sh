function vxml () {
	echo "/$1"
}

pairs="$QUERY_STRING"
pairs=${pairs#\"} pairs=${pairs%\"} pairs="${pairs}&"

while [ "$pairs" ]
do
	p=${pairs%%&*}
	pairs=${pairs#$p&}
	[ "$p" ] && eval "export $p"
done
unset p pairs

case "$cmd" in
	voice)
		[ ! "$arg1" ] && arg1="Nothing%20to%20say"
		[ ! "$arg2" ] && arg2="out$$.wav"
		cscript /NoLogo speak.js "$arg1" "$arg2"
		mv $arg2 ../cdn
		vxml "$arg2"
		;;
	*)
		;;
esac
