<div class="themes-php">
<div class="wrap">

<?php include('tabs.php'); ?>

<div id="ThemeistsCustomSidebarspage">
<div id="poststuff">


<div id="col-right">
 
	<h2 class="title"><?php _e('New Sidebar','custom-sidebars'); ?></h2>
	<p><?php _e( 'When a custom sidebar is created, it is shown on the <code>Appearance > Widgets</code> page where you will be able to add any widgets to your newly created sidebar.', 'custom-sidebars'); ?></p>
	<form action="themes.php?page=ThemeistsCustomSidebars" method="post">
		<?php wp_nonce_field( 'custom-sidebars-new');?>
		<div id="namediv" class="stuffbox">
			<h3><label for="sidebar_name"><?php _e('Name','custom-sidebars'); ?></label></h3>
			<div class="inside">
				<input type="text" name="sidebar_name" size="30" tabindex="1" value="" id="link_name" />
			    <p><?php _e('The name has to be unique.','custom-sidebars')?></p>
			</div>
		</div>
			
		<div id="addressdiv" class="stuffbox">			
			<h3><label for="sidebar_description"><?php echo _e('Description','custom-sidebars'); ?></label></h3>
			<div class="inside">
				<input type="text" name="sidebar_description" size="30" class="code" tabindex="1" value="" id="link_url" />
			</div>
		</div>
		
		<p class="submit"><input type="submit" class="button-primary" name="create-sidebars" value="<?php _e('Create Sidebar','custom-sidebars'); ?>" /></p>
	</form>
	
</div>




<div id="col-left">

	<form action="themes.php?page=ThemeistsCustomSidebars" method="post">
		<?php wp_nonce_field( 'custom-sidebars-options','options_wpnonce');?>
		
		<div id="modifiable-sidebars">
			<h2><?php _e('Replaceable Sidebars','custom-sidebars'); ?></h2>
			<p><?php _e('Please select the sidebars that you would like to mark as being replaceable. This means that you will be able to swap them for other sidebars on each page. You can select several sidebars by holding the [ctrl] key on Windows or the [cmd] key on a mac.','custom-sidebars'); ?></p>
			<div id="msidebardiv" class="stuffbox">
				<h3><label for="sidebar_name"><?php _e('Select replaceable sidebars','custom-sidebars'); ?></label></h3>
				<div class="inside">
					<select name="modifiable[]" multiple="multiple" size="20" style="height:auto;" id="sidebarselect">
					<?php foreach($themesidebars as $key => $ts):?>
						<option value="<?php echo $key;?>" <?php echo (!empty($modifiable) && array_search($key, $modifiable)!== FALSE) ? 'selected="selected"' : ''; ?>>
						<?php echo $ts['name'];?>
						</option>
					<?php endforeach;?>
					</select>
				</div>
			</div>
		</div>
		<input type="hidden" id="_wpnonce" name="_wpnonce" value="0a6b5c3eae" />
		<input type="hidden" name="_wp_http_referer" value="/wordpress/wp-admin/themes.php?page=ThemeistsCustomSidebars" /><p class="submit"><input type="submit" class="button-primary" name="update-modifiable" value="<?php _e('Save Changes','custom-sidebars'); ?>" /></p>
		
	</form>
</div>






<?php
////////////////////////////////////////////////////////
//SIDEBARLIST
////////////////////////////////////////////////////////////
?>

<div id="sidebarslistdiv">
	<script type="text/javascript">
		jQuery(document).ready( function($){
			$('.csdeletelink').click(function(){
				return confirm('<?php _e('Are you sure to delete this sidebar?','custom-sidebars');?>');
			});
		});
	</script>
	<h2><?php _e('All Custom Sidebars','custom-sidebars'); ?></h2>
	<p><?php _e('If a sidebar is deleted and is currently in use, the posts and pages which use it will show the default sidebar instead.','custom-sidebars'); ?></p>
	<table class="widefat fixed" cellspacing="0">
	
	<thead>
		<tr class="thead">
			<th scope="col" id="name" class="manage-column column-name" style=""><?php _e('Name','custom-sidebars'); ?></th>
			<th scope="col" id="email" class="manage-column column-email" style=""><?php _e('Description','custom-sidebars'); ?></th>
			<th scope="col" id="config" class="manage-column column-date" style=""></th>
			<th scope="col" id="edit" class="manage-column column-rating" style=""></th>
			<th scope="col" id="delete" class="manage-column column-rating" style=""></th>
		</tr>
	</thead>
	
	
	<tbody id="custom-sidebars" class="list:user user-list">
	
		<?php if(sizeof($ThemeistsCustomSidebars)>0): foreach($ThemeistsCustomSidebars as $cs):?>
		<tr id="cs-1" class="alternate">
			<td class="name column-name"><?php echo $cs['name']?></td>
			<td class="email column-email"><?php echo $cs['description']?></td>
			<td class="role column-date"><a class="" href="widgets.php"><?php _e('Configure Widgets','custom-sidebars'); ?></a></td>
			<td class="role column-rating"><a class="" href="themes.php?page=ThemeistsCustomSidebars&p=edit&id=<?php echo $cs['id']; ?>"><?php _e('Edit','custom-sidebars'); ?></a></td>
			<td class="role column-rating"><a class="csdeletelink" href="themes.php?page=ThemeistsCustomSidebars&delete=<?php echo $cs['id']; ?>&_n=<?php echo $deletenonce; ?>"><?php _e('Delete','custom-sidebars'); ?></a></td>
		</tr>
		<?php endforeach;else:?>
		<tr id="cs-1" class="alternate">
			<td colspan="3"><?php _e('There are currently no custom sidebars. You can create a new one using the "New Sidebar" form at the top right of this page.','custom-sidebars'); ?></td>
		</tr>
		<?php endif;?>
		
	</tbody>
	
	</table>
</div>





<?php
////////////////////////////////////////////////////////
//RESET SIDEBARS
////////////////////////////////////////////////////////////
?>
<div id="resetsidebarsdiv">
	<form action="themes.php?page=ThemeistsCustomSidebars" method="post">
	<input type="hidden" name="reset-n" value="<?php echo $deletenonce; ?>" />
	<h2><?php _e('Reset Sidebars','custom-sidebars'); ?></h2>
	<p><?php _e('Click on the button below to delete all the Custom Sidebars data from the database. Keep in mind that once the button is clicked you will have to create new sidebars and customize them to restore your current sidebars configuration.</p><p>If you are going to uninstall this plugin, you should do this beforehand.','custom-sidebars'); ?></p>
	
	<p class="submit"><input onclick="return confirm('<?php _e('Are you sure you want to delete all your custom sidebars?','custom-sidebars'); ?>')"type="submit" class="button-secondary" name="reset-sidebars" value="<?php _e('Delete All Custom Sidebars','custom-sidebars'); ?>" /></p>
	
	</form>
</div>

<?php include('footer.php'); ?>


</div>
</div>

</div>
</div>
