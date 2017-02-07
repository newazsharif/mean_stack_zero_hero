var recoursive = function(n)
{
	if(n<=2)
	{
		return 1;
	}
	else
	{
		recoursive(n-1)+recoursive(n-2);
	}
}
console.log(recoursive(42));